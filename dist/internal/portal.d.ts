import * as React from 'react';
export interface PortalProps {
    children: React.ReactNode;
    container?: Element | DocumentFragment | null;
}
/** Internal portal shared by every component that escapes the document flow. */
export declare function Portal({ children, container }: PortalProps): React.ReactPortal | null;
//# sourceMappingURL=portal.d.ts.map