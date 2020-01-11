import React from 'react';
import { InputText } from 'primereact/inputtext';

import { Task } from '../../components/Task/Task';
import { ValidationIcon } from '../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../utils/verifyNumber';
import { Fieldset } from 'primereact/fieldset';

interface Task521State {

    p: string;
    a: string;
    b: string;
}

export class Task521 extends Task<{}, Task521State> {

    state: Task521State = { p: '', a: '', b: '' };

    protected checkParameters(): boolean {
        const { p, a, b } = this.state;

        return verifyNumber(p) && verifyNumber(a) && verifyNumber(b);
    }

    private onExprChange(param: 'p' | 'a' | 'b') {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                [param]: e.currentTarget.value.trim()
            });
        };
    }

    protected renderParameters() {
        const { p, a, b } = this.state;

        return (
            <>
                <Fieldset legend={
                    <>f<sub>&#958;</sub> = cx<sup>{p || 'p'}</sup>, x &isin; [{a || 'a'}, {b || 'b'}]</>
                }>
                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            p =
                        </span>

                        <InputText value={p} onChange={this.onExprChange('p')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(p)} />
                        </span>
                    </div>

                    <div className="p-inputgroup half-margin-bottom">
                        <span className="p-inputgroup-addon">
                            a =
                        </span>

                        <InputText value={a} onChange={this.onExprChange('a')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(a)} />
                        </span>
                    </div>

                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            b =
                        </span>

                        <InputText value={b} onChange={this.onExprChange('b')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyNumber(b)} />
                        </span>
                    </div>
                </Fieldset>
            </>
        );
    }

    protected async renderAnswer() {
        const { p, a, b } = this.state;

        const c = `${+p + 1} / ${(+b) ** (+p + 1) - (+a) ** (+p + 1)}`;
        const e = `${c} / ${+p + 2} * ${(+b) ** (+p + 2) - (+a) ** (+p + 2)}`;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        c =
                    </span>

                    <InputText readOnly value={c} />
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        &#917;&#958; =
                    </span>

                    <InputText readOnly value={e} />
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        D&#958; =
                    </span>

                    <InputText readOnly value={`${c} / ${+p + 3} * ${(+b) ** (+p + 3) - (+a) ** (+p + 3)} - (${e})^2`} />
                </div>
            </>
        );
    }
}
