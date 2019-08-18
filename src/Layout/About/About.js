import React from 'react';
import withCartIndicator from '../../hoc/withCartIndicator';

const About = () => {
    return (
        <div>
            <h1>About</h1>
            <p>This is a demo React Redux Project.</p>
            <p>ou could Register using your own email (doesn't have to be valid), or use test@test.com/123456 to Login.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tellus sapien, maximus vel hendrerit non, facilisis id nisi. Quisque venenatis eleifend iaculis. Mauris a ultricies nisi. Etiam aliquet ullamcorper lacinia. Praesent sed erat molestie, auctor urna ut, varius eros. Nulla facilisi. Vestibulum ac eros nec urna pretium imperdiet at et nibh. In egestas, odio vitae interdum tincidunt, sem eros consequat justo, at imperdiet sem est eu tellus. Phasellus convallis eget sem in ultricies. Cras consequat cursus diam.</p>
        </div>
    );
}

export default withCartIndicator(About);