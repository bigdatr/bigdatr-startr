// @flow
import React from 'react';
import {SpruceClassName} from 'stampy';

//
// import examples

// import {default as Cog} from './IconCog';
// import {default as Cross} from './IconCross';
// import {default as Cycle} from './IconCycle';
// import {default as Filter} from './IconFilter';
// import {default as Pencil} from './IconPencil';


function Icon(props: Object): React.Element<any> {
    const {
        className,
        content: Content,
        modifier
    } = props;

    return <svg className={SpruceClassName({name: "Icon", modifier, className})} viewBox="0 0 16 16" width="16" height="16">
        <Content />
    </svg>;
}


//
// export examples

export const IconCog = 'Not here';
// export const IconCross = (props) => <Icon {...props} content={Cross} />;
// export const IconCycle = (props) => <Icon {...props} content={Cycle} />;
// export const IconFilter = (props) => <Icon {...props} content={Filter} />;
// export const IconPencil = (props) => <Icon {...props} content={Pencil} />;
// export {IconPencil as IconEdit};
