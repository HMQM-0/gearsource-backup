import React from "react";

import { NauticalAPI } from "../api";

export const NauticalContext = React.createContext<NauticalAPI | null>(null);
