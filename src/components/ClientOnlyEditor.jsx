"use client";

import dynamic from "next/dynamic";
import React from "react";

const V5Editor = dynamic(() => import("@/V5/V5Editor"), { ssr: false });
const V6Editor = dynamic(() => import("@/V6/V6Editor"), { ssr: false });
const V7Editor = dynamic(() => import("@/V7/V7Editor"), { ssr: false });

export function ClientOnlyEditor({ version, tab }) {
  switch (version) {
    case 'v5': return <V5Editor tab={tab} />;
    case 'v6': return <V6Editor />;
    case 'v7': return <V7Editor />;
    default: return <V5Editor tab={tab} />;
  }
}
