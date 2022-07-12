import React from 'react';

export default function LabWorkBenchLogo(props) {
    return (
        <img style={{marginLeft: 4}} height={props.height} src={require('../../../../resources/images/lab-logo-purple.svg')} alt='lab-logo' />
    );
}