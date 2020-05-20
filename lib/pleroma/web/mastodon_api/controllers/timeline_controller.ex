# Pleroma: A lightweight social networking server
# Copyright © 2017-2020 Pleroma Authors <https://pleroma.social/>
# SPDX-License-Identifier: AGPL-3.0-only

defmodule Pleroma.Web.MastodonAPI.TimelineController do
  use Pleroma.Web, :controller

  import Pleroma.Web.ControllerHelper,
    only: [add_link_headers: 2, add_link_headers: 3]

  alias Pleroma.Pagination
  alias Pleroma.Plugs.EnsurePublicOrAuthenticatedPlug
  alias Pleroma.Plugs.OAuthScopesPlug
  alias Pleroma.Plugs.RateLimiter
  alias Pleroma.User
  alias Pleroma.Web.ActivityPub.ActivityPub

  plug(Pleroma.Web.ApiSpec.CastAndValidate)
  plug(:skip_plug, EnsurePublicOrAuthenticatedPlug when action in [:public, :hashtag])

  # TODO: Replace with a macro when there is a Phoenix release with the following commit in it:
  # https://github.com/phoenixframework/phoenix/commit/2e8c63c01fec4dde5467dbbbf9705ff9e780735e

  plug(RateLimiter, [name: :timeline, bucket_name: :direct_timeline] when action == :direct)
  plug(RateLimiter, [name: :timeline, bucket_name: :public_timeline] when action == :public)
  plug(RateLimiter, [name: :timeline, bucket_name: :home_timeline] when action == :home)
  plug(RateLimiter, [name: :timeline, bucket_name: :hashtag_timeline] when action == :hashtag)
  plug(RateLimiter, [name: :timeline, bucket_name: :list_timeline] when action == :list)

  plug(OAuthScopesPlug, %{scopes: ["read:statuses"]} when action in [:home, :direct])
  plug(OAuthScopesPlug, %{scopes: ["read:lists"]} when action == :list)

  plug(
    OAuthScopesPlug,
    %{scopes: ["read:statuses"], fallback: :proceed_unauthenticated}
    when action in [:public, :hashtag]
  )

  plug(:put_view, Pleroma.Web.MastodonAPI.StatusView)

  defdelegate open_api_operation(action), to: Pleroma.Web.ApiSpec.TimelineOperation

  # GET /api/v1/timelines/home
  def home(%{assigns: %{user: user}} = conn, params) do
    params =
      params
      |> Map.new(fn {key, value} -> {to_string(key), value} end)
      |> Map.put("type", ["Create", "Announce"])
      |> Map.put("blocking_user", user)
      |> Map.put("muting_user", user)
      |> Map.put("reply_filtering_user", user)
      |> Map.put("user", user)

    recipients = [user.ap_id | User.following(user)]

    activities =
      recipients
      |> ActivityPub.fetch_activities(params)
      |> Enum.reverse()

    conn
    |> add_link_headers(activities)
    |> render("index.json",
      activities: activities,
      for: user,
      as: :activity
    )
  end

  # GET /api/v1/timelines/direct
  def direct(%{assigns: %{user: user}} = conn, params) do
    params =
      params
      |> Map.new(fn {key, value} -> {to_string(key), value} end)
      |> Map.put("type", "Create")
      |> Map.put("blocking_user", user)
      |> Map.put("user", user)
      |> Map.put(:visibility, "direct")

    activities =
      [user.ap_id]
      |> ActivityPub.fetch_activities_query(params)
      |> Pagination.fetch_paginated(params)

    conn
    |> add_link_headers(activities)
    |> render("index.json",
      activities: activities,
      for: user,
      as: :activity
    )
  end

  # GET /api/v1/timelines/public
  def public(%{assigns: %{user: user}} = conn, params) do
    params = Map.new(params, fn {key, value} -> {to_string(key), value} end)

    local_only = params["local"]

    cfg_key =
      if local_only do
        :local
      else
        :federated
      end

    restrict? = Pleroma.Config.get([:restrict_unauthenticated, :timelines, cfg_key])

    if restrict? and is_nil(user) do
      render_error(conn, :unauthorized, "authorization required for timeline view")
    else
      # TODO: return back after benchmarks
      params =
        params
        |> Map.put("type", ["Create", "Announce"])
        |> Map.put("local_only", local_only)
        |> Map.put("blocking_user", user)
        |> Map.put("muting_user", user)
        |> Map.put("reply_filtering_user", user)

      params =
        if params["method"] do
          Map.put(params, :method, String.to_existing_atom(params["method"]))
        else
          params
        end

      activities = ActivityPub.fetch_public_activities(params)

      conn
      |> add_link_headers(activities, %{"local" => local_only})
      |> render("index.json",
        activities: activities,
        for: user,
        as: :activity
      )
    end
  end

  defp hashtag_fetching(params, user, local_only) do
    tags =
      [params["tag"], params["any"]]
      |> List.flatten()
      |> Enum.uniq()
      |> Enum.filter(& &1)
      |> Enum.map(&String.downcase(&1))

    tag_all =
      params
      |> Map.get("all", [])
      |> Enum.map(&String.downcase(&1))

    tag_reject =
      params
      |> Map.get("none", [])
      |> Enum.map(&String.downcase(&1))

    _activities =
      params
      |> Map.put("type", "Create")
      |> Map.put("local_only", local_only)
      |> Map.put("blocking_user", user)
      |> Map.put("muting_user", user)
      |> Map.put("user", user)
      |> Map.put("tag", tags)
      |> Map.put("tag_all", tag_all)
      |> Map.put("tag_reject", tag_reject)
      |> ActivityPub.fetch_public_activities()
  end

  # GET /api/v1/timelines/tag/:tag
  def hashtag(%{assigns: %{user: user}} = conn, params) do
    params = Map.new(params, fn {key, value} -> {to_string(key), value} end)
    local_only = params["local"]
    activities = hashtag_fetching(params, user, local_only)

    conn
    |> add_link_headers(activities, %{"local" => local_only})
    |> render("index.json",
      activities: activities,
      for: user,
      as: :activity
    )
  end

  # GET /api/v1/timelines/list/:list_id
  def list(%{assigns: %{user: user}} = conn, %{list_id: id} = params) do
    with %Pleroma.List{title: _title, following: following} <- Pleroma.List.get(id, user) do
      params =
        params
        |> Map.new(fn {key, value} -> {to_string(key), value} end)
        |> Map.put("type", "Create")
        |> Map.put("blocking_user", user)
        |> Map.put("user", user)
        |> Map.put("muting_user", user)

      # we must filter the following list for the user to avoid leaking statuses the user
      # does not actually have permission to see (for more info, peruse security issue #270).

      user_following = User.following(user)

      activities =
        following
        |> Enum.filter(fn x -> x in user_following end)
        |> ActivityPub.fetch_activities_bounded(following, params)
        |> Enum.reverse()

      render(conn, "index.json",
        activities: activities,
        for: user,
        as: :activity
      )
    else
      _e -> render_error(conn, :forbidden, "Error.")
    end
  end
end
