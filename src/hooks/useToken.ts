import { useState } from "react";

import SessionStorageTokenRepo from "../repositories/SessionStorageTokenRepo";

export function useToken(): readonly [string | null, (token: string) => void] {
  const [token, _setToken] = useState<string | null>(SessionStorageTokenRepo.get());

  const setToken = (token: string) => {
    SessionStorageTokenRepo.save(token);
    _setToken(token);
  };

  return  [ token, setToken ] as const;
}

