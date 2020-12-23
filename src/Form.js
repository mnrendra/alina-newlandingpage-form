import { useState } from 'react'

import listOfCountryCodes from './utils/listOfCountryCodes'
import listOfIdCellCodes from './utils/listOfIdCellCodes'

const API_URL = 'https://api.alinagroup.agency'

const Form = () => {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [alert, setAlert] = useState({})
  const [phoneElStyle, setPhoneElStyle] = useState({})
  const [nameElStyle, setNameElStyle] = useState({})

  const validatePhone = (phone) => {
    if (typeof phone !== 'string' || phone.length < 3 || phone.length > 16) return false

    let dialCode
    let cellularCode
    let validPhoneByCountryCode
    let validPhoneByCellularCode

    listOfCountryCodes.some(country => {
      if (phone.includes(country.dial_code)) {
        const phoneSplitA = phone.split(country.dial_code)
        if (phoneSplitA[0] === '' && Number(phoneSplitA[1])) {
          dialCode = country.dial_code
          validPhoneByCountryCode = country.dial_code + Number(phoneSplitA[1])
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    })

    listOfIdCellCodes.some(code => {
      if (phone.includes(code)) {
        const phoneSplitB = phone.split(code)
        if (phoneSplitB[0] === '' && Number(phoneSplitB[1])) {
          cellularCode = code
          validPhoneByCellularCode = phone.replace(0, '+62')
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    })

    if (dialCode) {
      return {
        validPhone: validPhoneByCountryCode,
        dialCode: dialCode
      }
    } else if (cellularCode) {
      return {
        validPhone: validPhoneByCellularCode,
        cellularCode: cellularCode
      }
    } else {
      return {}
    }
  }

  const handlePhone = (e) => {
    e.preventDefault()
    const value = e.target.value.replace(/[^0-9]+/g, '').slice(0, 16)
    setPhone(value)
    setAlert({ text: '', color: '#424242' })
    setPhoneElStyle({ background: '#FFFFFF', borderColor: '#BDBDBD' })
  }

  const handleName = (e) => {
    const value = e.target.value.replace(/[^\w\s]/gi, '').slice(0, 32)
    setName(value)
    setAlert({ text: '', color: '#424242' })
    setNameElStyle({ background: '#FFFFFF', borderColor: '#BDBDBD' })
  }

  const handleSubmit = () => {
    const { validPhone } = validatePhone(phone)

    if (!validPhone) {
      setAlert({ text: 'Mohon isi nomor whatsapp yang valid!', color: '#F44336' })
      setPhoneElStyle({ background: '#FFCDD2', borderColor: '#F44336' })
    } else {
      if (!name) {
        setAlert({ text: 'Mohon isi nama Anda!', color: '#F44336' })
        setNameElStyle({ background: '#FFCDD2', borderColor: '#F44336' })
      } else {
        setAlert({ text: 'Loading ...', color: '#424242' })
        setPhoneElStyle({ background: '#FFFFFF', borderColor: '#BDBDBD' })
        setNameElStyle({ background: '#FFFFFF', borderColor: '#BDBDBD' })

        fetch(API_URL + '/lead', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({
            phone,
            name
          })
        })
          .then(res => res.json())
          .then(json => {
            if (json.error) {
              setAlert({ text: json.error.message, color: '#F44336' })
            } else if (json.invalid) {
              setAlert({ text: json.invalid, color: '#F44336' })
            } else if (json.success) {
              const data = json.success && json.success.data ? json.success.data : {}
              const name = data.name || ''
              const phone = data.phone || ''
              setAlert({
                text: 'Terimakasih ' + name + '!\r\nTim kami akan segera menghubungi Anda di nomor ' + phone + '.',
                color: '#4CAF50'
              })
              window.open('https://alinagroup.agency/sukses', '_self')
            } else {
              console.log('Response is unknown', json)
              setAlert({ text: 'Terjadi kesalahan, mohon ulangi lagi', color: '#FF9800' })
            }
          })
          .catch(e => {
            console.log('Catch ERROR when fetching: ' + API_URL + '/lead', e)
            setAlert({ text: 'Terjadi kerusakan di server, mohon hubungi admin di nomor 0852-2324-1381', color: '#F44336' })
          })
      }
    }
  }

  return (
    <div
      data-instance='1'
      className='CF5fdc1ef7b2d8b caldera_forms_form cfajax-trigger _tisBound'
      method='POST'
      encType='multipart/form-data'
      id='CF5fdc1ef7b2d8b_1'
      data-form-id='CF5fdc1ef7b2d8b'
      aria-label='Ayunda Form'
      data-target='#caldera_notices_1'
      data-template='#cfajax_CF5fdc1ef7b2d8b-tmpl'
      data-cfajax='CF5fdc1ef7b2d8b'
      data-load-element='_parent'
      data-load-classname='cf_processing'
      data-post-disable='0'
      data-action='cf_process_ajax_submit'
      data-request='https://alinagroup.agency/cf-api/CF5fdc1ef7b2d8b'
      data-hiderows='true'
    >
      <div className='Alert' style={{ textAlign: 'center', color: alert.color }}>{alert.text}</div>
      <br />
      <div id='CF5fdc1ef7b2d8b_1-row-1' className='row  first_row'>
        <div className='col-sm-12  single'>
          <div data-field-wrapper='fld_7265355' className='form-group' id='fld_7265355_1-wrap'>
            <label id='fld_7265355Label' htmlFor='fld_7265355_1' className='control-label'>No. WhatsApp Anda <span aria-hidden='true' role='presentation' className='field_required' style={{ color: '#ee0000' }}>*</span></label>
            <div className=''>
              <input
                value={phone}
                onChange={handlePhone}
                placeholder='Nomor Whatsapp'
                required=''
                type='text'
                data-field='fld_7265355'
                className='form-control'
                id='fld_7265355_1'
                name='fld_7265355'
                data-type='number'
                data-parsley-type='number'
                aria-required='true'
                aria-labelledby='fld_7265355Label'
                style={phoneElStyle}
              />
            </div>
          </div>
          <div data-field-wrapper='fld_8768091' className='form-group' id='fld_8768091_1-wrap'>
            <label id='fld_8768091Label' htmlFor='fld_8768091_1' className='control-label'>Nama Anda <span aria-hidden='true' role='presentation' className='field_required' style={{ color: '#ee0000' }}>*</span></label>
            <div className=''>
              <input
                value={name}
                onChange={handleName}
                placeholder='Nama'
                required=''
                type='text'
                data-field='fld_8768091'
                className='form-control'
                id='fld_8768091_1'
                name='fld_8768091'
                data-type='text'
                aria-required='true'
                aria-labelledby='fld_8768091Label'
                style={nameElStyle}
              />
            </div>
          </div>
        </div>
      </div>
      <div id='CF5fdc1ef7b2d8b_1-row-2' className='row  last_row'>
        <div className='col-sm-12  single'>
          <div data-field-wrapper='fld_7908577' className='form-group' id='fld_7908577_1-wrap'>
            <div className=''>
              <button
                onClick={handleSubmit}
                className='btn btn-default'
                name='fld_7908577'
                id='fld_7908577_1'
                data-field='fld_7908577'
              >
                KIRIMKAN!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
