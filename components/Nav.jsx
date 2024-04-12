"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={40}
          height={40}
          alt="logo"
          className="object-contain"
        />
        <p className="logo_text">Thoughtshare</p>
      </Link>

      {/* desktop */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session.user.image}
                width={30}
                height={30}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                  key={provider.name}
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image}
              width={30}
              height={30}
              className="rounded-full"
              alt="profile"
              onClick={() => setDropDown((prev) => !prev)}
            />
            {dropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown_link"
                  onClick={() => setDropDown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setDropDown(false);
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                  key={provider.name}
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
