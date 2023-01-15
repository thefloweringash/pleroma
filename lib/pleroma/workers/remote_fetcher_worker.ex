# Pleroma: A lightweight social networking server
# Copyright © 2017-2022 Pleroma Authors <https://pleroma.social/>
# SPDX-License-Identifier: AGPL-3.0-only

defmodule Pleroma.Workers.RemoteFetcherWorker do
  alias Pleroma.Object.Fetcher

  use Pleroma.Workers.WorkerHelper, queue: "remote_fetcher"

  @impl Oban.Worker
  def perform(%Job{args: %{"op" => "fetch_remote", "id" => id} = args}) do
    with {:ok, _object} <- Fetcher.fetch_object_from_id(id, depth: args["depth"]) do
      :ok
    else
      {:error, "Max thread distance exceeded."} = e ->
        {:discard, e}

      {:error, "Object has been deleted"} = e ->
        {:discard, e}

      {:reject, _reason} = e ->
        {:discard, e}

      {:error, _reason} = e ->
        e
    end
  end

  @impl Oban.Worker
  def timeout(_job), do: :timer.seconds(10)
end
