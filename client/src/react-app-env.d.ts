/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface Process {
    env: { [key: string]: string };
  }
}
