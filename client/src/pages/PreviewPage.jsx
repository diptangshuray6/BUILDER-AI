import React, { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import FullPagePreview from "../components/FullPagePreview";
import { useAppContext } from "../context/AppContext";

const PreviewPage = () => {
  const { id } = useParams();
  const {
    activeProject: project,
    loadingActiveProject: loading,
    loadingUser,
    loadProject,
  } = useAppContext();

  // useEffect(() => {
  //   if (id) {
  //     loadProject(id);
  //   }
  // }, [id]);

  useEffect(() => {

        // Wait until authentication check is finish
        if (loadingUser) return;
        if (!id) return;
        loadProject(id);
    }, [id, loadingUser]);

  // First wait for user/session check
    if (loadingUser) {
        return <Loading />;
    }

  if (loading || !project) {
    return <Loading />
  }

  return (
  <FullPagePreview files={project.files} />

  )
};

export default PreviewPage;
