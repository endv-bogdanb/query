import { loginReqSchema, TLoginReq } from "@models";

export interface ILogin {
  title: string;
  onLogin: (user: TLoginReq) => void;
  error?: { message: string };
}

export function Login({ title, onLogin, error }: ILogin) {
  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="flex flex-col w-md shadow-2xl p-6 bg-light-50 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const values = loginReqSchema.safeParse({
            // @ts-expect-error
            username: e.target.username.value,
            // @ts-expect-error
            password: e.target.password.value,
          });

          if (values.success) {
            onLogin(values.data);
          }
        }}
      >
        <h3>{title}</h3>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input name="username" type="text" defaultValue={"admin"} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            autoComplete="off"
            defaultValue={"admin"}
          />
        </div>
        <button type="submit">Login !</button>
        <div className="text-red-600 h-6">{!!error ? error.message : null}</div>
      </form>
    </div>
  );
}
