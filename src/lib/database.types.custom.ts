// ============================================================
// Custom semantic aliases over the auto-generated Database type.
// Purpose: give named imports for enums used across the codebase
// so consumers don't re-derive the same alias inline.
// Only add an alias here when at least one consumer imports it.
// ============================================================

import type { Database } from "./database.types";

type PublicEnums = Database["public"]["Enums"];

export type LeadTemperature = PublicEnums["lead_temperature"];

// Add more aliases as consumers need them. Keep this file lean —
// resist adding speculative exports.
