import React from "react";
export const FormBuilderContext = React.createContext<any>(null);

export const useFormBuilderContext = () => React.useContext(FormBuilderContext);
