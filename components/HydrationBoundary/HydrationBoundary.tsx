"use client";

import React from "react";
import { QueryClient, QueryClientProvider, DehydratedState, hydrate } from "@tanstack/react-query";

type HydrationBoundaryProps = {
  children: React.ReactNode;
  state: DehydratedState;
};

export function HydrationBoundary({ children, state }: HydrationBoundaryProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  if (state) {
    hydrate(queryClient, state);
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}