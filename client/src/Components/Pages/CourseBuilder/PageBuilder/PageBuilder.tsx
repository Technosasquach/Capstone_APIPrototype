import React from "react";
import InformationField from './InformationField'
import "./PageBuilder.less";

const PageBuilderPage = (props: any) => {
  return (
      <div className="pageBuilder">
        <div className="title">
            <h1>{props.nodeName}</h1>
        </div>
        <InformationField 
          Content={props.Content}
          Images={props.Images}
          setContent={props.setContent}
          setImages={props.setImages}
        />
      </div>
  );
}


export default PageBuilderPage;