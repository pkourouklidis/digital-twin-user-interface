import React from 'react';

export default function KubernetesLogo(props) {
    return (
        <img height={props.height} src={require('../../../../resources/images/kubernetes-logo-purple.svg')} alt='kubernetes-logo' />
    );
}