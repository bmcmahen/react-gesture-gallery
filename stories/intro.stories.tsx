import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Gallery, GalleryImage } from "../src";
import "./styles.css";

function Example() {
  const [index, setIndex] = React.useState(0);

  const images = [
    {
      src:
        "https://images.unsplash.com/photo-1557958114-3d2440207108?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
    },
    {
      src:
        "https://images.unsplash.com/photo-1557939403-1760a0e47505?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1931&q=80"
    },
    {
      src:
        "https://images.unsplash.com/photo-1558029062-a37889b87526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
    },
    {
      src:
        "https://images.unsplash.com/photo-1558088458-b65180740294?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1579&q=80"
    },
    {
      src:
        "https://images.unsplash.com/photo-1558039719-79cb7b60d279?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
    }
  ];

  return (
    <div style={{ background: "black", width: "100vw", height: "100vh" }}>
      <Gallery
        index={index}
        onRequestChange={i => {
          setIndex(i);
        }}
      >
        {images.map(img => (
          <GalleryImage objectFit="cover" key={img.src} src={img.src} />
        ))}
      </Gallery>
    </div>
  );
}

storiesOf("Hello", module).add("Example", () => <Example />);
