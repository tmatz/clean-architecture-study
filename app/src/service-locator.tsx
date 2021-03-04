import React, { useContext } from 'react';

export type ServiceLocator = {
  [key: string]: any;
};

export const ServiceLocatorContext = React.createContext<ServiceLocator>({});

export function useServiceLocator<T>(name: string) {
  const serviceLocator = useContext(ServiceLocatorContext);
  return serviceLocator[name] as T;
}

function mapValue(obj: any, func: (value: any) => any) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, func(value)]),
  );
}

function expandValue(obj: any) {
  return mapValue(obj, (v) => (typeof v === 'function' ? v() : v));
}

export function withService<TProps, TServices>(
  WrappedComponent: React.ComponentType<TProps>,
  services: TServices,
): React.ComponentType<Omit<TProps, keyof TServices>> {
  return (props: Omit<TProps, keyof TServices>) => {
    const mergedProps = ({
      ...props,
      ...expandValue(services),
    } as unknown) as TProps;
    return <WrappedComponent {...mergedProps} />;
  };
}
