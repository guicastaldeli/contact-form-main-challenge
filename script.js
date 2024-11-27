//Form elements...
    const container = document.getElementById('--container');
    const form = document.querySelector('form');

    //First & Last Name
        const lbFsNm = document.getElementById('--l-i-fsn');
        const inFsNm = document.getElementById('--i-fsn');

        const lbLsNm = document.getElementById('--l-i-ln');
        const inLsNm = document.getElementById('--i-ln');
    //

    //Email
        const lbEa = document.getElementById('--l-i-ea');
        const inEa = document.getElementById('--i-ea');
    //

    //Query Type elements
        const cQt = document.getElementById('c-qt--');

        //Gen. Eq.
            const lbGe = document.getElementById('--l-i-ge');
            const inGe = document.getElementById('--i-ge');
        //

        //Supp. Req.
            const lbSr = document.getElementById('--l-i-sr');
            const inSr = document.getElementById('--i-sr');
        //
    //

    //Message
        const lbMsg = document.getElementById('--l-i-m');
        const inMsg = document.getElementById('--i-m');
    //

    //Contact
        const cbCnt = document.getElementById('cb');

        const lbCont = document.getElementById('--l-i-c');
        const inCont = document.getElementById('--i-c');
    //

    //Submit
        const inSb = document.getElementById('--i-sb');
    //
//

//Send & Verify
    const i = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
    const r = form.querySelectorAll('input[type="radio"]');
    const cb = form.querySelectorAll('input[type="checkbox"]');

    let active = true;

    function sndForm__() {
        function send(e) {
            let ie = false;

            const fi = Array.from(i).every(is => is.value.trim() !== '');
            const fr = Array.from(r).some(rs => rs.checked);
            const fcb = Array.from(cb).some(cb => cb.checked);

            //regex
                function regex() {
                    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                    i.forEach(is => {
                        if(is.type === 'email' && is.value.trim() !== '') {
                            if(!regex.test(is.value)) {
                                ie = true;

                                is.classList.add('-i-err');
                                const eId = `${is.id}-e`;

                                if(!document.getElementById(eId)) {
                                    const em = document.createElement('label');

                                    em.className = 'e-m-';
                                    em.id = eId;
                                    em.htmlFor = is.id;

                                    em.textContent = 'Please enter a valid email address';

                                    //Append
                                    is.insertAdjacentElement("afterend", em);
                                }
                            }

                            is.addEventListener('input', () => {
                                is.classList.remove('-i-err');
                            })
                        }
                    })
                }

                regex();
            //

            if(fi && fr && fcb && !ie) {
                active = false;
                
                form.reset();
            }

            e.preventDefault();
        }

        //Listener
        inSb.addEventListener('click', (e) => send(e));
    }

    function vrfyForm__() {
        function empty(e) {
            const ei = Array.from(i).some(is => is.value.trim() === '');
            const er = Array.from(r).every(rs => !rs.checked);
            const ec = Array.from(cb).some(cb => !cb.checked);

            if(ei) {
                i.forEach(is => {
                    if(is.value.trim() === '') {
                        is.classList.add('-i-err');

                        const eId = `${is.id}-e`;

                        if(!document.getElementById(eId)) {
                            const em = document.createElement('label');

                            em.className = 'e-m-';
                            em.id = eId;
                            em.htmlFor = is.id;

                            em.textContent = 'This field is required';

                            //Append
                            is.insertAdjacentElement("afterend", em);
                        }
                    }
                });

                if(er || ec) {
                    if(er) {
                        if(!document.getElementById('rerr-')) {
                            const rErr = document.createElement('label');

                            rErr.className = 'e-m-';
                            rErr.id = 'rerr-';
                            rErr.htmlFor = 'c-qt--';

                            rErr.textContent = 'Please select a query type';

                            //Append
                            cQt.append(rErr);
                        }
                    }

                    if(ec) {
                        if(!document.getElementById('cerr-')) {
                            const cErr = document.createElement('label');

                            cErr.className = 'e-m-';
                            cErr.id = 'cerr-';
                            cErr.htmlFor = '--i-c';

                            cErr.textContent = 'To submit this form, please consent to being contacted';

                            //Append
                            cbCnt.append(cErr);
                        }
                    }
                }
                
                e.preventDefault();
            }

        }

        function fill() {
            i.forEach(is => {
                is.addEventListener('input', () => {
                    const eId = `${is.id}-e`;
                    const em = document.getElementById(eId);

                    if(em) {
                        em.remove();
                    }

                    if(document.querySelector('.e-m-')) {
                        is.classList.remove('-i-err');
                    }
                })
            });

            r.forEach(rs => {
                rs.addEventListener('change', () => {
                    const rErr = document.getElementById('rerr-');

                    if(rErr) {
                        rErr.remove();
                    }
                })
            });


            cb.forEach(cb => {
                cb.addEventListener('change', () => {
                    const cErr = document.getElementById('cerr-');

                    if(cErr) {
                        cErr.remove();
                    }
                })
            });
        }

        //Listener & Execs...
            fill();
            inSb.addEventListener('click', (e) => empty(e));
        //
    }

    function alert() {
        inSb.addEventListener('click', () => {
            if(!active) {
                active = true;
                
                //div
                    const a = document.createElement('div');
                    a.id = 'a-b--';
        
                    //p
                        const t = document.createElement('p');
                        t.id = 't--';
                        t.textContent = 'Message Sent!';
                    //
        
                    //a
                        const tt = document.createElement('a');
                        tt.id = 'tt--';
                        tt.textContent = "Thanks for completing the form. We'll be in touch soon!";
                    //

                    //svg
                        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                        svg.setAttribute('width', '20');
                        svg.setAttribute('height', '21');
                        svg.setAttribute('fill', 'none');
                        svg.setAttribute('viewBox', '0 0 20 21');
                        svg.id = 'svg';

                        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        path.setAttribute('fill', '#fff');
                        path.setAttribute('d', 'M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z');

                        svg.append(path);
                    //
        
                    //Append
                        a.append(t);
                        a.append(tt);

                        a.append(svg);
        
                        form.append(a);
    
                        //Timeout
                            setTimeout(() => {
                                a.style.animation = 'cAnim 0.22s forwards';

                                setTimeout(() => {
                                    a.remove();
                                }, 350);
                            }, 3000);
                        //
                    //
                //
            }
        })
    }

    //Listeners & Execs...
        vrfyForm__();
        sndForm__();

        alert();
    //
//
