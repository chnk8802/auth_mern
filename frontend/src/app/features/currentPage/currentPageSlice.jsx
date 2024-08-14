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
    if (!doctype || typeof doctype !== 'string') {
        console.error('Invalid doctype:', doctype, typeof doctype);  // Log the error for debugging
        return '';  // Return an empty string or handle it appropriately
      }

    if (doctype.endsWith("y") && !doctype.endsWith("ay") && !doctype.endsWith("ey") && !doctype.endsWith("iy") && !doctype.endsWith("oy") && !doctype.endsWith("uy")) {
      return doctype.slice(0, -1) + "ies";  // Change "y" to "ies"
    } else if (doctype.endsWith("s") || doctype.endsWith("x") || doctype.endsWith("z") || doctype.endsWith("ch") || doctype.endsWith("sh")) {
      return doctype + "es";  // Add "es" for words ending in "s", "x", "z", "ch", or "sh"
    } else {
      return doctype + "s";  // Regular plural form by adding "s"
    }
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
            state.path = `/${pluralizeDoctype(action.payload.doctype)?.toLowerCase()}`
        },
        clearCurrentPageInfo: () => initialState
    }
})

export const {setCurrentPageInfo, clearCurrentPageInfo} = currentPageSlice.actions
export default currentPageSlice.reducer