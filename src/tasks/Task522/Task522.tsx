import React from 'react';
import { InputText } from 'primereact/inputtext';

import { Task } from '../../components/Task/Task';
import { ValidationIcon } from '../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../utils/verifyNumber';
import { Fieldset } from 'primereact/fieldset';

interface Task522State {

    e: [string, string];
    a: string;
    b: string;
}

export class Task522 extends Task<{}, Task522State> {

    state: Task522State = { e: ['', ''], a: '', b: '' };

    private static checkArray(array: [string, string]) {
        return array.filter(verifyNumber).map(Number).length === 2;
    }

    protected checkParameters(): boolean {
        const { e, a, b } = this.state;

        return Task522.checkArray(e) && verifyNumber(a) && verifyNumber(b);
    }

    private onEChange(i: number) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const params = [...this.state.e] as [string, string];

            params[i] = e.currentTarget.value.trim();
            this.setState({ ...this.state, e: params });
        };
    }

    private onParamChange(param: 'a' | 'b') {
        return (e: React.FormEvent<HTMLInputElement>) => this.setState({
            ...this.state,

            [param]: e.currentTarget.value
        });
    }

    protected renderParameters() {
        const { e, a, b } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        &#917;&#958;<sub>1</sub> =
                    </span>

                    <InputText value={e[0]} onChange={this.onEChange(0)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(e[0])} />
                    </span>
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        &#917;&#958;<sub>2</sub> =
                    </span>

                    <InputText value={e[1]} onChange={this.onEChange(1)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(e[1])} />
                    </span>
                </div>

                <Fieldset legend={
                    <>Найти &#917;({a || 'a'}&#958;<sub>1</sub> + {b || 'b'}&#958;<sub>2</sub>)</>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            a =
                        </span>

                        <InputText value={a} onChange={this.onParamChange('a')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(a)} />
                        </span>
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            b =
                        </span>

                        <InputText value={b} onChange={this.onParamChange('b')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(b)} />
                        </span>
                    </div>
                </Fieldset>
            </>
        );
    }

    protected async renderAnswer() {
        const { e, a, b } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        &#917;({a}&#958;<sub>1</sub> + {b}&#958;<sub>2</sub>) =
                    </span>

                    <InputText readOnly value={+a * +e[0] + +b * +e[1]} />
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        &#917;(&#958;<sub>1</sub>&#958;<sub>2</sub>) =
                    </span>

                    <InputText value={+e[0] * +e[1]} readOnly />
                </div>
            </>
        );
    }
}