import Markdoc, { type Config } from "@markdoc/markdoc"
import React from "react"
import Callout from "@/components/md/callout.tsx"
import Fence from "@/components/md/fence.tsx"

const fence = {
  render: "Fence",
  attributes: {
    language: {
      type: String,
    },
  },
}

const callout = {
  render: "Callout",
  attributes: {},
}

export const config: Config = {
  tags: { callout },
  nodes: { fence },
  variables: {},
}

const components = {
  Fence,
  Callout,
}

export function Markdown(content: string) {
  const ast = Markdoc.parse(content)
  const transformed = Markdoc.transform<Config>(ast, config)
  return Markdoc.renderers.react(transformed, React, { components })
}
