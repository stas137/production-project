import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import AboutPage from './AboutPage';

export default {
  title: 'pages/AboutPage',
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = () => <AboutPage />;

export const Primary = Template.bind({});
Primary.args = {
};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
