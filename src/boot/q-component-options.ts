import type {
  ComponentConstructor,
  QCardProps,
  QInputProps,
  QSelectProps,
  QTableProps,
} from 'quasar';
import { QCard, QInput, QSelect, QTable } from 'quasar';
import { boot } from 'quasar/wrappers';

export default boot(() => {
  SetComponentDefaults<QCardProps>(QCard, {
    flat: true,
    bordered: true,
  });
  SetComponentDefaults<QInputProps>(QInput, {
    outlined: true,
    dense: true,
  });
  SetComponentDefaults<QSelectProps>(QSelect, {
    outlined: true,
    dense: true,
  });
  SetComponentDefaults<QTableProps>(QTable, {
    bordered: true,
    dense: true,
    flat: true,
  });
});

/**
 * Set some default properties on a component
 */
const SetComponentDefaults = <T>(
  component: ComponentConstructor<T>,
  defaults: Partial<T>,
): void => {
  Object.keys(defaults).forEach((prop: string) => {
    component.props[prop] =
      Array.isArray(component.props[prop]) === true || typeof component.props[prop] === 'function'
        ? {
            type: component.props[prop],
            default: (defaults as Record<string, unknown>)[prop],
          }
        : {
            ...component.props[prop],
            default: (defaults as Record<string, unknown>)[prop],
          };
  });
};
