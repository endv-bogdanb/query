import { loginReqSchema, TLoginReq } from "@models";
import styles from "./styles.module.css";

export interface ILogin {
  title: string;
  onLogin: (user: TLoginReq) => void;
  loading: boolean;
  error?: { message: string };
}

export function Login({ title, onLogin, loading, error }: ILogin) {
  console.log(error);
  return (
    <>
      <div className={styles.wrapper}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            const values = loginReqSchema.safeParse(
              Object.fromEntries(data.entries()),
            );

            if (values.success) {
              onLogin(values.data);
            }
          }}
        >
          <h3 className={styles.title}>{title}</h3>
          <section className={styles.section}>
            <label className={styles.label}>
              <p>Username</p>
              <input
                name="username"
                type="text"
                defaultValue={"admin"}
                autoComplete="off"
              />
            </label>
            <label className={styles.label}>
              <p>Password</p>
              <input
                name="password"
                type="password"
                autoComplete="off"
                defaultValue={"admin"}
              />
            </label>
          </section>
          <footer>
            <button type="submit" disabled={loading}>
              {loading ? <progress /> : "Login !"}
            </button>
            {error && <p className={styles.error}>{error.message}</p>}
          </footer>
        </form>
      </div>
    </>
  );
}
