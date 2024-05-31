import { TUser } from "@models";
import { HttpError } from "@utils";

export interface IUserProfile {
  user?: TUser;
  loading: boolean;
  error?: unknown;
  retry: () => void;
}

export function UserProfile({ user, loading, error, retry }: IUserProfile) {
  return (
    <div>
      <div>
        {user && <img src={user.profile.logo} height={160} alt="avatar" />}
      </div>
      <div>
        {user && (
          <>
            <div>{user.username}</div>
            <div>
              {user.profile.firstName} {user.profile.lastName}
            </div>
          </>
        )}
      </div>
      {loading ? "loading ..." : null}
      {error ? (
        <div>
          <div>{HttpError.getErrorMessage(error)}</div>
          <button onClick={retry}>Retry</button>
        </div>
      ) : null}
    </div>
  );
}
