import React from 'react';

export default function GitLabLogo(props) {
    return (
        <img height={props.height} src={require('../../../../resources/images/gitlab-logo-purple.svg')} alt='gitlab-logo' />
    );
}