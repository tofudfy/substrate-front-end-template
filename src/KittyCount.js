import React, { useEffect, useState } from 'react';
import { Statistic, Grid, Card, Icon } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

function Main (props) {
    const { api } = useSubstrate();
    // const { finalized } = props;
    const [kittiesNumber, setkittiesNumber] = useState(0);

    const subscribeKittyCnt = () => {
        let unsub = null;

        const asyncFetch = async () => {
            unsub = await api.query.substrateKitties.kittyCnt(async cnt => {
                setkittiesNumber(cnt.toNumber());
            });
        };

        asyncFetch();

        return () => {
            unsub && unsub();
        };
    };

    useEffect(subscribeKittyCnt);

    return (
        <Grid.Column>
            <Card>
                <Card.Content textAlign='center'>
                    <Statistic
                        label={'Num of Kitties'}
                        value={kittiesNumber}
                    />
                </Card.Content>
            </Card>
        </Grid.Column>
    );
}

export default function KittiesNumber (props) {
    const { api } = useSubstrate();
    return api.query
        ? <Main {...props} />
        : null;
}
