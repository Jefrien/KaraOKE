'use client'
/*import { Scrollbar } from 'smooth-scrollbar-react';
import * as SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

// Register the plugin
SmoothScrollbar.default.use(OverscrollPlugin);*/

export default function MainScroll({ children }: { children: any }) {
    return (
        /*<Scrollbar
            alwaysShowTracks={false}
            thumbMinSize={5}
            damping={0.2}>*/
            <div style={{ height: 'calc( 100vh - 100px )' }} className='px-6 overflow-y-auto pb-6' >
                {children}
            </div>
       // </Scrollbar>
    )
}