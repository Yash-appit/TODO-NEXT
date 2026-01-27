'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuillBase = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <p>Loading Editor...</p>,
});

const ReactQuillEditor = (props: any) => {
    // Custom modules to strip styles on paste
    const modules = useMemo(() => {
        return {
            ...props.modules,
            clipboard: {
                ...props.modules?.clipboard,
                matchers: [
                    // Match all elements (Node.ELEMENT_NODE = 1)
                    [1, (_node: any, delta: any) => {
                        // Strip attributes from all ops to enforce plain text
                        delta.ops = delta.ops.map((op: any) => ({ insert: op.insert }));
                        return delta;
                    }],
                    ...(props.modules?.clipboard?.matchers || [])
                ]
            },
            // Start using the standard toolbar if one isn't provided, 
            // or rely on ReactQuill's default if we don't specify 'toolbar'.
            // However, since we are returning a new object, ReactQuill might lose defaults 
            // if we don't be careful. But usually 'clipboard' is separate.
        };
    }, [props.modules]);

    return <ReactQuillBase {...props} modules={modules} />;
};

export default ReactQuillEditor;
