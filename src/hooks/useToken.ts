import { useState } from "react";

import TokenService from "../service/TokenService";

export function useToken(): readonly [string | null, (token: string) => void] {
  const [token, _setToken] = useState<string | null>(TokenService.getToken());

  const setToken = (token: string) => {
    TokenService.saveToken(token)
    _setToken(token);
  };

  return  [ token, setToken ] as const;
}

