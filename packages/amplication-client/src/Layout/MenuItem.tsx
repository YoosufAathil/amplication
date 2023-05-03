import React, { ReactNode } from "react";
import { useRouteMatch, NavLink } from "react-router-dom";
import classNames from "classnames";
import { Button } from "../Components/Button";

import { ButtonFormat, Icon, Tooltip } from "@amplication/ui/design-system";
import "./MenuItem.scss";

type Props = {
  /** Optional URL to navigate to on click  */
  to?: string;
  /** Text to be displayed when the menu is expanded, and in a tooltip */
  title: string;
  /** Optional text to be displayed in the tooltip instead of the title */
  overrideTooltip?: string;
  /** the name of the icon to display, ignored when the component has children */
  icon?: string;
  /** Optional class name to be added to the element */
  className?: string;
  hideTooltip?: boolean;
  disableHover?: boolean;
  children?: ReactNode;
  onClick?: () => void;
};

const NON_URL = "non-url";
const DIRECTION = "e";
const ICON_SIZE = "medium";

const CLASS_NAME = "amp-menu-item";

/**
 *
 * @title is for the aria-label of the badge
 */
const MenuItem = ({
  to,
  title,
  overrideTooltip,
  icon,
  className,
  children,
  hideTooltip = false,
  disableHover = false,
  onClick,
}: Props) => {
  const match = useRouteMatch(to || NON_URL);

  const content = (
    <NavLink to={to} className={`${CLASS_NAME}__link`}>
      {children ? children : <Icon icon={icon} size={ICON_SIZE} />}
    </NavLink>
  );

  return (
    <div
      className={classNames(CLASS_NAME, className, {
        "amp-menu-item--active": match !== null,
        "amp-menu-item--no-hover": disableHover,
      })}
    >
      {hideTooltip ? (
        content
      ) : (
        <Tooltip
          className={`${CLASS_NAME}__tooltip`}
          aria-label={overrideTooltip || title}
          direction={DIRECTION}
          noDelay
        >
          {content}
        </Tooltip>
      )}
    </div>
  );
};

export default MenuItem;
