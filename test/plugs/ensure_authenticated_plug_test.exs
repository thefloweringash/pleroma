# Pleroma: A lightweight social networking server
# Copyright © 2017-2020 Pleroma Authors <https://pleroma.social/>
# SPDX-License-Identifier: AGPL-3.0-only

defmodule Pleroma.Plugs.EnsureAuthenticatedPlugTest do
  use Pleroma.Web.ConnCase, async: true

  alias Pleroma.Plugs.EnsureAuthenticatedPlug
  alias Pleroma.User

  describe "without :if_func / :unless_func options" do
    test "it halts if user is NOT assigned", %{conn: conn} do
      conn = EnsureAuthenticatedPlug.call(conn, %{})

      assert conn.status == 403
      assert conn.halted == true
    end

    test "it continues if a user is assigned", %{conn: conn} do
      conn = assign(conn, :user, %User{})
      ret_conn = EnsureAuthenticatedPlug.call(conn, %{})

      refute ret_conn.halted
    end
  end

  describe "with :if_func / :unless_func options" do
    setup do
      %{
        true_fn: fn _conn -> true end,
        false_fn: fn _conn -> false end
      }
    end

    test "it continues if a user is assigned", %{conn: conn, true_fn: true_fn, false_fn: false_fn} do
      conn = assign(conn, :user, %User{})
      refute EnsureAuthenticatedPlug.call(conn, if_func: true_fn).halted
      refute EnsureAuthenticatedPlug.call(conn, if_func: false_fn).halted
      refute EnsureAuthenticatedPlug.call(conn, unless_func: true_fn).halted
      refute EnsureAuthenticatedPlug.call(conn, unless_func: false_fn).halted
    end

    test "it continues if a user is NOT assigned but :if_func evaluates to `false`",
         %{conn: conn, false_fn: false_fn} do
      ret_conn = EnsureAuthenticatedPlug.call(conn, if_func: false_fn)
      refute ret_conn.halted
    end

    test "it continues if a user is NOT assigned but :unless_func evaluates to `true`",
         %{conn: conn, true_fn: true_fn} do
      ret_conn = EnsureAuthenticatedPlug.call(conn, unless_func: true_fn)
      refute ret_conn.halted
    end

    test "it halts if a user is NOT assigned and :if_func evaluates to `true`",
         %{conn: conn, true_fn: true_fn} do
      conn = EnsureAuthenticatedPlug.call(conn, if_func: true_fn)

      assert conn.status == 403
      assert conn.halted == true
    end

    test "it halts if a user is NOT assigned and :unless_func evaluates to `false`",
         %{conn: conn, false_fn: false_fn} do
      conn = EnsureAuthenticatedPlug.call(conn, unless_func: false_fn)

      assert conn.status == 403
      assert conn.halted == true
    end
  end
end
