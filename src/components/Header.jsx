import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

export const Header = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <header className="text-gray-600 body-font shadow-lg">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          {/* ホームアイコン */}
          <Link
            to={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">ベトナム語解析ツール</span>
          </Link>
          {/* ナビゲーション */}
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link to={"/home"} className="mr-5 hover:text-gray-900">
              ホーム
            </Link>

            {showModeratorBoard && (
              <Link to={"/mod"} className="mr-5 hover:text-gray-900">
                Moderator Board
              </Link>
            )}

            {showAdminBoard && (
              <Link to={"/admin"} className="mr-5 hover:text-gray-900">
                Admin Board
              </Link>
            )}

            {currentUser && (
              <Link to={"/analyze"} className="mr-5 hover:text-gray-900">
                解析
              </Link>
            )}

            {currentUser && (
              <Link to={"/add-accent"} className="mr-5 hover:text-gray-900">
                声調記号付加
              </Link>
            )}

            {currentUser ? (
              <a
                href="/login"
                className="mr-5 hover:text-gray-900"
                onClick={logOut}
              >
                ログアウト
              </a>
            ) : (
              <div>
                <Link to={"/login"} className="mr-5 hover:text-gray-900">
                  ログイン
                </Link>

                <Link to={"/register"} className="mr-5 hover:text-gray-900">
                  登録
                </Link>
              </div>
            )}
          </nav>
          {/* アバター */}
          {currentUser && (
            <Link to={"/profile"} className="mr-5 hover:text-gray-900">
              <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                <div className="mr-3">{currentUser.username}</div>
                <div className="avatar">
                  <div className="w-8 rounded">
                    <img src="https://api.lorem.space/image/face?hash=92048" />
                  </div>
                </div>
              </button>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
