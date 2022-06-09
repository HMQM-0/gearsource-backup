import {
  ApolloError,
  MutationUpdaterFn,
  MutationFunction,
  MutationResult,
} from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";
import { DocumentNode } from "graphql";
import * as React from "react";

export interface TypedMutationInnerProps<TData, TVariables> {
  children: (
    mutateFn: MutationFunction<TData, TVariables>,
    result: MutationResult<TData>
  ) => React.ReactNode;
  onCompleted?: (data: TData) => void;
  onError?: (error: ApolloError) => void;
  variables?: TVariables;
}

export function TypedMutation<TData, TVariables>(
  mutation: DocumentNode,
  update?: MutationUpdaterFn<TData>
) {
  return (props: TypedMutationInnerProps<TData, TVariables>) => {
    const { children, onCompleted, onError, variables } =
      props as JSX.LibraryManagedAttributes<typeof TypedMutation, typeof props>;
    return (
      <Mutation
        mutation={mutation}
        onCompleted={onCompleted}
        onError={onError}
        variables={variables}
        update={update}
        // children={children}
      >
        {/* @ts-ignore */}
        {children}
      </Mutation>
    );
  };
}
