import { useState } from "react";
import { Error } from "../common/Errors";
import { useTranslation } from "react-i18next";

export default function SignUp({ clientService, i18nKeyPrefix = "signup" }) {
  const { t } = useTranslation("translation", {
    keyPrefix: i18nKeyPrefix,
  });

  const { getURIforSignIn } = {
    ...clientService,
  };

  const [error, setError] = useState(null);
  const uri_idp_UI = getURIforSignIn();

  const handleLogin = (e) => {
    e.preventDefault();
    setError({
      errorCode: "sign_up_failed",
    });
  };

  return (
    <>
      <div className="w-full px-20">
        <h1 className="w-full text-center title-font sm:text-3xl text-3xl mt-8 mb-8 font-medium text-gray-900">
          {t("sign_up_with_health_portal")}
        </h1>

        <div className="flex grid grid-cols-2 gap-2 w-full">
          <div className="w-full flex flex-col mb-6 text-slate-500">
            <label>{t("first_name")}</label>
            <input
              type="text"
              id="website-admin"
              className="rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
            />
          </div>
          <div className="w-full flex flex-col mb-6 text-slate-500">
            <label>{t("last_name")}</label>
            <input
              type="text"
              id="website-admin"
              className="rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
            />
          </div>
        </div>
        <div className="w-full flex flex-col mb-6 text-slate-500">
          <label>{t("password")}</label>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
          />
        </div>
        <button
          type="button"
          className="w-full justify-center text-white bg-[#2F8EA3] hover:bg-[#2F8EA3]/90 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center mr-2 mb-2"
          onClick={handleLogin}
        >
          {t("submit")}
        </button>

        {error && (
          <Error errorCode={error.errorCode} errorMsg={error.errorMsg} />
        )}

        <div className="flex w-full mb-6 mt-6 items-center px-10">
          <div className="flex-1 h-px bg-black" />
          <div>
            <p className="w-16 text-center">{t("or")}</p>
          </div>
          <div className="flex-1 h-px bg-black" />
        </div>
        <a
          href={uri_idp_UI}
          className="w-full font-medium text-blue-600 hover:text-blue-500"
        >
          <button
            type="button"
            className="relative w-full text-black bg-gray-50 shadow-lg hover:bg-gray-100  font-medium rounded-lg text-sm px-5 py-2.5 flex items-center mr-2 mb-2"
          >
            {t("sign_up_with_mosip")}
            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
              <img className="flex mr-1 ml-1 w-6 h-6" src="mosip_logo.png" />
            </div>
          </button>
        </a>
        <div className="flex flex-justify mt-3 w-full items-center text-center">
          <p className="w-full text-center">
            {t("already_have_account")}&nbsp;
            <a href="/" className="text-[#2F8EA3]">
              {t("sign_in_here")}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
