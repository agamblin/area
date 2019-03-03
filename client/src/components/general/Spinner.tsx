import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface SpinnerProps {
	loading: boolean;
}

const Spinner = (props: SpinnerProps) => {
	if (props.loading) {
		return (
			<Dimmer active inverted>
				<Loader size="medium">Loading</Loader>
			</Dimmer>
		);
	}
	return null;
};

export default Spinner;
