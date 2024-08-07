import { FormEvent } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { sessionAtom } from "@/atoms/session";
import { useLogin, useSetSession } from "@/hooks/useApi";
import { handleErrors } from "@/utils";
import { ordersPage } from "@/utils/consts";
import { useAlert } from "@/hooks/useAlert";
import { useForm } from "@/hooks/useForm";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { ButtonLink } from "@/components/Button/ButtonLink";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [, setSession] = useAtom(sessionAtom);
  const { displayAlert } = useAlert();
  const { mutateAsync: signIn, isPending: isLoginLoading } = useLogin();
  const { mutateAsync: setUserSession, isPending: isSessionLoading } =
    useSetSession();
  const { formData, handleInputChange, isDisabled } = useForm({
    email: { value: "" },
    password: { value: "" },
  });

  const isLoading = isLoginLoading || isSessionLoading;

  const logIn = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const { email, password } = formData;
      const { data, error } = await signIn({
        email: email.value,
        password: password.value,
      });

      if (error) throw error;

      if (data.session) {
        const { error: sessionError } = await setUserSession(data.session);
        if (sessionError) throw sessionError;
        setSession(data.session);
        router.replace(ordersPage);
      } else {
        throw new Error("Something failed");
      }
    } catch (e) {
      handleErrors(e, displayAlert);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-4">
      <form className="flex flex-col gap-4" onSubmit={logIn}>
        <h1 className="text-center text-4xl font-bold">Food Flow</h1>
        <Field
          type="email"
          name="email"
          label="Email"
          onInput={handleInputChange}
          value={formData.email.value}
          disabled={isLoading}
          required={formData.email.required}
        />
        <Field
          type="password"
          name="password"
          label="Password"
          onInput={handleInputChange}
          value={formData.password.value}
          disabled={isLoading}
          required={formData.password.required}
        />
        <Button
          type="submit"
          disabled={isLoading || isDisabled}
          isLoading={isLoading}
        >
          sign in
        </Button>
        <div className="flex items-center justify-center gap-4 px-2">
          <span className="h-[1px] w-full grow bg-gray-300" />
          <span className="shrink-0 text-center text-gray-500">Or</span>
          <span className="h-[1px] w-full grow bg-gray-300" />
        </div>
        <ButtonLink href="/sign-up">Sign up</ButtonLink>
      </form>
      <div className="flex flex-col items-center py-4"></div>
    </section>
  );
};

export default LoginPage;
