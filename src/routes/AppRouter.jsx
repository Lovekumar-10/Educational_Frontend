// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import PublicRoutes from "./PublicRoutes";
// import AuthRoutes from "./AuthRoutes";
// import DashboardRoutes from "./DashboardRoutes";

// const AppRoutes = () => {
//   return (
//     <Router>
//       <Routes>

//         {/* Grouped Routes */}
//         <Route path="/*" element={<PublicRoutes />} />
//         <Route path="/*" element={<AuthRoutes />} />
//         <Route path="/*" element={<DashboardRoutes />} />

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />

//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;











import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import DashboardRoutes from "./DashboardRoutes";


const AppRoutes = () => {

  return (
    <Router>
      <Routes>

        {PublicRoutes()}
        {AuthRoutes()}
        {DashboardRoutes()}

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;