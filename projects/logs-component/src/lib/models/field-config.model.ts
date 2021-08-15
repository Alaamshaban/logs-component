export interface FieldConfig {
    name: string;
    type: string;
    label: string;
    order: number;
    options?: any[];
    initialValue?: any;
    validators?: any[];
    validators_fields?: string[];
}

export interface FormConfig {
    fields: FieldConfig[];
    validators?: Validatorconfig[];
    custom_configurations?: any[];
    bulk_actions?: BulkAction[];
}

export interface BulkAction {
    name: string;
    minLength: number;
}

export interface Validatorconfig {
    validator_name: string;
    validator_fields: string[];
}
