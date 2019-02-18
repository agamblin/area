import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export default (props: any) => {
	return (
		<Form.Field>
			<Input
				{...props.input}
				placeholder={props.label}
				label={null}
				icon="lock"
				iconPosition="left"
				type="password"
			/>
			{props._renderErrors(props.meta)}
		</Form.Field>
	);
};
