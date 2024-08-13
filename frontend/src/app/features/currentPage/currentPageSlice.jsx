import { createSlice } from "@reduxjs/toolkit";


/*

1. type: type of page
    a. page
    b. form
    c. report
2. docname: name/id/unique identifier of current document/record
3. pageHeading: Main heading of the page
4. isReport: A boolean for identifing if a current page is a report 

*/
const pluralizeDoctype = (doctype) => {
    // Basic pluralization logic; you might replace this with a more robust solution
    if (doctype.endsWith("y")) return doctype.slice(0, -1) + "ies";
    return doctype + "s";
  };

const initialState =  {
    type: "",
    doctype: "",
    docname: "",
    pageHeading:"",
    isReport: false,
    path: ""
}
export const currentPageSlice = createSlice({
    name: "currentPage",
    initialState,
    reducers: {
        setCurrentPageInfo: (state, action) => {
            state.type = action.payload.type;
            state.doctype = action.payload.doctype,
            state.docname = action.payload.docname,
            state.pageHeading = action.payload.pageHeading,
            state.isReport = action.payload.isReport
            state.path = `/${action.payload.doctype?.toLowerCase()}s`
        },
        clearCurrentPageInfo: () => initialState
    }
})

export const {setCurrentPageInfo, clearCurrentPageInfo} = currentPageSlice.actions
export default currentPageSlice.reducer