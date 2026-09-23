import * as React from 'react';
/** Keeps content mounted until its CSS exit animation or transition completes. */
export declare function usePresence(present: boolean): {
    mounted: boolean;
    present: boolean;
    ref: React.RefObject<HTMLElement | null>;
};
//# sourceMappingURL=presence.d.ts.map