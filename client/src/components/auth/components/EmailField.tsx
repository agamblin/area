import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export default (props: any) => {
	return (
		<Form.Field>
			<Input
				{...props.input}
				placeholder={props.label}
				label={null}
				icon="mail"
				iconPosition="left"
				type="email"
			/>
			{props._renderErrors(props.meta)}
		</Form.Field>
	);
};
