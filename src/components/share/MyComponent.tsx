import React from 'react';
import { MDXRemote } from 'next-mdx-remote';

const MyComponent = ({ source }: any) => {
    return (
        <div>
            <MDXRemote {...source} />
        </div>
    );
};

export default MyComponent;