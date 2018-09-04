import * as React from 'react';

export default function({ ...props }: JSX.IntrinsicElements['div']) {
  return <div {...props} />;
}
