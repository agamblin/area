import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export default (props: any) => {
	return (
		<Form.Field>
			<Input
				{...props.input}
				icon="user"
				iconPosition="left"
				placeholder={props.label}
				label={null}
				type="text"
			/>
			{props._renderErrors(props.meta)}
		</Form.Field>
	);
};
