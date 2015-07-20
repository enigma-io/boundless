import UITypeahead from './index';
import UIView from '../UIView';
import React from 'react';

export default class UITypeaheadDemo extends UIView {
    initialState() {
        return {
            fruits: [
                'Apple',
                'Apricot',
                'Avocado',
                'Açai Berries',
                'Banana',
                'Bartlett pear',
                'Bilberry',
                'Black raspberry',
                'Blackberry',
                'Blackcurrant',
                'Blood Orange',
                'Blueberry',
                'Boysenberry',
                'Cantaloupe',
                'Cherimoya',
                'Cherry',
                'Clementine',
                'Cloudberry',
                'Coconut',
                'Cranberry',
                'Currant',
                'Damson',
                'Date',
                'Dragonfruit',
                'Durian',
                'Elderberry',
                'Feijoa',
                'Fig',
                'Goji berry',
                'Gooseberry',
                'Grape',
                'Grapefruit',
                'Guava',
                'Honeydew',
                'Huckleberry',
                'Jabouticaba',
                'Jackfruit',
                'Jambul',
                'Jujube',
                'Juniper berry',
                'Kiwi fruit',
                'Kumquat',
                'Lemon',
                'Lime',
                'Loquat',
                'Lychee',
                'Mandarine',
                'Mango',
                'Marion berry',
                'Melon',
                'Miracle fruit',
                'Mulberry',
                'Nectarine',
                'Olive',
                'Orange',
                'Papaya',
                'Passionfruit',
                'Peach',
                'Pear',
                'Persimmon',
                'Physalis',
                'Pineapple',
                'Plum/prune (dried plum)',
                'Pomegranate',
                'Pomelo',
                'Purple Mangosteen',
                'Quince',
                'Raisin',
                'Rambutan',
                'Raspberry',
                'Redcurrant',
                'Rock melon',
                'Salal berry',
                'Salmon berry',
                'Satsuma',
                'Star fruit',
                'Strawberry',
                'Tamarillo',
                'Tangerine',
                'Ugli fruit',
                'Watermelon',
                'Williams pear'
            ]
        };
    }

    render() {
        return (
            <div>
                <p>Begin typing the name of a fruit...</p>
                <UITypeahead entities={this.state.fruits} showHint={true} />
            </div>
        );
    }
}
