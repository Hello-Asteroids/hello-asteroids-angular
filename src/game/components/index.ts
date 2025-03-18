import type {
	ComponentType,
	ISchema
} from 'bitecs';

type ComponentMap = {
	[ key : string ] : ComponentType<ISchema>;
}

const componentMap : ComponentMap = {};
export default componentMap;
