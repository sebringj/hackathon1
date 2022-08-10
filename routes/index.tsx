/** @jsx h */
import { Fragment, h } from "preact";
import Test from '../islands/Test.tsx';

export const Head = () => (
  <head>
      <title>Lil' OpenAI experiment - by Jason Sebring</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet" />
      <link href="./style.css" rel="stylesheet" />
  </head>
);

export default function Home() {
  return (
    <Fragment>
      <Head />
      <Fragment>
        <Test />
      </Fragment>
    </Fragment>
  );
}
